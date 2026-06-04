import { Box } from '@mui/material';
import { MainImage, Thumbnails, Thumb } from './ProductDetails.styles';

interface Props {
  images: string[];
  thumbnail: string;
  title: string;
  activeImage: number;
  onSelect: (index: number) => void;
}

export const ProductGallery = ({ images, thumbnail, title, activeImage, onSelect }: Props) => (
  <Box>
    <MainImage
      src={images[activeImage] ?? thumbnail}
      alt={title}
      sx={{ bgcolor: 'action.hover' }}
    />
    {images.length > 1 && (
      <Thumbnails>
        {images.map((img, i) => (
          <Thumb
            key={i}
            src={img}
            alt={`${title} ${i + 1}`}
            active={i === activeImage}
            onClick={() => onSelect(i)}
            loading="lazy"
            sx={{ bgcolor: 'action.hover' }}
          />
        ))}
      </Thumbnails>
    )}
  </Box>
);
