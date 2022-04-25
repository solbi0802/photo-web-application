import React, { useState, useEffect } from 'react';
import photoStore from '../store/photoStore';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTitleProps,
  IconButton,
  styled,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styles from './Dialog.module.scss';
import Image from 'next/image';
import CollectionList from './CollectionList';
interface Props {
  setShowDialog: (value: boolean) => void;
  id: string;
}

interface PhotoInfo {
  width: number;
  height: number;
  views?: number;
  description?: string;
  urls: {
    regular: string;
  };
  exif: {
    name?: string;
    focal_length?: number;
    aperture?: number;
    exposure_time?: string;
    iso?: number;
  };
  related_collections: {
    results: any;
  };
}

const DetailDialog = (props: Props): JSX.Element => {
  const { setShowDialog, id } = props;
  const [photoInfo, setPhotoInfo] = useState<PhotoInfo>();

  useEffect(() => {
    if (id) {
      find();
    }
  }, [id]);

  const find = async (): Promise<void> => {
    try {
      const result = await photoStore.findById(id);
      setPhotoInfo(result);
    } catch (err: any) {
      console.log(err.response);
    }
  };

  const CustomDialogTitle = () => {
    return (
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <IconButton
          aria-label="close"
          onClick={(): void => {
            setShowDialog(false);
          }}
          sx={{
            position: 'absolute',
            right: 1,
            top: 1,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
    );
  };
  return (
    <Dialog
      open={true}
      onClose={(): void => {
        setShowDialog(false);
      }}
      sx={{
        '& .MuiPaper-root': {
          width: '100%',
          height: '100%',
        },
      }}
    >
      <CustomDialogTitle></CustomDialogTitle>
      <DialogContent>
        {photoInfo && (
          <div className={styles.detail_dialog}>
            <Image
              src={photoInfo.urls.regular}
              width={photoInfo.width}
              height={photoInfo.height}
              alt={photoInfo.description}
            />
            <div className={styles.info_section}>
              <span>{`views: ${photoInfo?.views}`}</span>
              <Image
                data-testid="photo-camerag-icon"
                src="/photo_camera_black.svg"
                alt="camera"
                width="24px"
                height="24px"
              />
              {photoInfo.exif?.name}
              <span>{`${photoInfo.exif?.focal_length || ''}mm fl${
                photoInfo.exif?.aperture
              }`}</span>
              <span>{`${photoInfo.exif?.exposure_time || ''}s`}</span>
              <span>{`ISO ${photoInfo.exif?.iso || ''}`}</span>
              <span>{`Dimensions ${photoInfo.width} x ${photoInfo.height} `}</span>
            </div>
            <div className={styles.related_photos}>
              <CollectionList
                collection={photoInfo.related_collections?.results}
              ></CollectionList>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DetailDialog;
