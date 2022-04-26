import React, { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.scss';
import store from '../store';
import { rgbDataURL } from '../utils/color';
import DetailDialog from '../components/DetailDialog';
import { NextPage } from 'next';
import { Button, TextField } from '@mui/material';

const Home: NextPage = () => {
  const { photoStore } = store;
  const [item, setItem] = useState<any>([]);
  const [keyword, setKeyword] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [showDetailDialog, setShowDetailDialog] = useState<boolean>(false);
  const [photoId, setPhotoId] = useState<string>('');

  useEffect(() => {
    photoList();
  }, [page]);

  useEffect(() => {
    if (loading) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            viewMore();
          }
        },
        { threshold: 1 },
      );
      observer.observe(pageEnd.current);
    }
  }, [loading]);

  const photoList = async (): Promise<void> => {
    const result = await photoStore.getPhotoList(page);
    setItem([...item, ...result]);
    setLoading(true);
  };

  const searchPhoto = async (): Promise<void> => {
    if (keyword) {
      const result = await photoStore.searchPhoto(keyword);
      setItem(result.results);
    } else {
      photoList();
    }
  };
  const pageEnd = useRef<any>();
  const viewMore = (): void => {
    setPage((prev: number) => prev + 1);
  };

  // 엔터키 입력했을 때도 검색 동작하도록 이벤트 처리
  const enterKeyEvent = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.keyCode === 13) {
      searchPhoto();
    }
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Photo Web Application</title>
        <meta name="description" content="Photo Web Application" />
      </Head>
      <header className={styles.search_section}>
        <TextField
          className={styles.keyword}
          fullWidth
          placeholder="사진 검색"
          onKeyUp={(e: any): void => {
            setKeyword(e.target.value);
            enterKeyEvent(e);
          }}
        />
        <Button
          variant="contained"
          className={styles.search_btn}
          onClick={(): void => {
            searchPhoto();
          }}
        >
          검색
        </Button>
      </header>
      <main className={styles.main}>
        <div className={styles.image_area}>
          {item?.map((i: any, index: number) => {
            return (
              <div key={index} className={styles.image_list}>
                <Image
                  className={styles.image_item}
                  width={i.width}
                  height={i.height}
                  src={i.urls?.regular}
                  alt={i.user.username}
                  layout={'intrinsic'}
                  placeholder="blur"
                  blurDataURL={rgbDataURL(1, 1, 1)}
                  onClick={(): void => {
                    setPhotoId(i.id);
                    setShowDetailDialog(true);
                  }}
                />
                <div
                  className={styles.user_area}
                  onClick={(): void => {
                    window.open(`${i.user.links.html}`);
                  }}
                >
                  <Image
                    width={32}
                    height={32}
                    src={i.user.profile_image.small}
                    alt={i.user.username}
                  />
                  <p>{i.user.username}</p>
                </div>
              </div>
            );
          })}
        </div>
      </main>
      <footer className={styles.footer}>
        <Button variant="contained" onClick={viewMore} ref={pageEnd}>
          더보기
        </Button>
      </footer>
      {showDetailDialog && (
        <DetailDialog
          id={photoId}
          setShowDialog={(value: boolean): void => {
            setShowDetailDialog(value);
          }}
        ></DetailDialog>
      )}
    </div>
  );
};

export default Home;
