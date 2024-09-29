import React, { useState, useCallback, useRef, useEffect } from 'react';
import axios from 'axios';
import styles from './slider.module.scss';
import Post from '../Post/Post';

interface Job {
  id: string;
  head: string;
  category: string;
  detail: string;
  email: string;
  like: number;
  date: string;
  company: string;
  view: number;
}

interface ISlider {
  sidebarVisibility: boolean;
  setSidebarVisibility: (sidebarVisibility: boolean) => void;
}

const POSTS_PER_PAGE = 2;

const InfiniteSwipe: React.FC<ISlider> = (props) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [report, setReport] = useState({ scrollTop: 0, scrollHeight: 0, clientHeight: 0 });
  const { sidebarVisibility, setSidebarVisibility } = props;

  const api = {
    baseURL: import.meta.env.VITE_API_URL as string,
    config: {
      headers: {
        accept: 'application/json',
        Authorization: import.meta.env.VITE_API_KEY as string
      }
    }
  };

  const loadMoreJobs = useCallback(async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axios.get(`${api.baseURL}?limit=${POSTS_PER_PAGE}&offset=${offset}`, api.config);
      const newJobs = Array.isArray(response.data.content) ? response.data.content : [];
      
      setJobs(prevJobs => {
        const allJobs = [...prevJobs, ...newJobs];
        const uniqueJobs = Array.from(new Set(allJobs.map(job => job.id)))
          .map(id => allJobs.find(job => job.id === id) as Job);
        return uniqueJobs;
      });
      
      setOffset(prevOffset => prevOffset + 1);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  }, [offset, loading]);

  useEffect(() => {
    loadMoreJobs();
  }, []);

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      setReport({
        scrollTop: scrollTop,
        scrollHeight: scrollHeight,
        clientHeight: clientHeight
      });
      // +-1 mobile scroll bug fix
      if (scrollHeight - scrollTop - 1 || scrollHeight - scrollTop + 1 === clientHeight && !loading) {
        loadMoreJobs();
      }
    }
  }, [loadMoreJobs, loading]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  return (
    <div className={styles.container} 
    ref={containerRef}
    onClick={() => {
      if (sidebarVisibility===true) {
        setSidebarVisibility(false);
      }
    }}
    id='container'
    >
      {jobs.map((job, index) => (
        <Post key={job.id} 
        index={index} 
        {...job} 
        setSidebarVisibility={setSidebarVisibility}
        sidebarVisibility={sidebarVisibility} />
      ))}
      {loading && <div className={styles.loading}>Yüklənir...</div>}
      
      <div className={styles.report} style={{
        display: 'none'
      }} >
        {`${report.scrollHeight}, ${report.scrollTop}, ${report.clientHeight}`}
      </div>

    </div>
  );
};

export default InfiniteSwipe;
