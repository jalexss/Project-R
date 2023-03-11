import { ImageList, ImageListItem } from "@mui/material"

export const RecetaMediaImages = ({images}) => {

  const imagesCount =  images ? images.length : undefined;

  return (
    <ImageList 
        cols={imagesCount > 2 ? 3 : imagesCount} 
        rowHeight={'auto'}
        sx={{ 
          width: { lg:(imagesCount> 1 ? 550 : 500 ), xs: 450 },
          height: { lg:'auto', xs: 'auto' }, 
        }}  
      >
        {
          images.map((image, index) => { return (
            <ImageListItem key={index} >
              <img
                src={image.src}
                alt={image.title}
                loading="lazy"
              />
            </ImageListItem>
          )})
        }
    </ImageList>
  )
}

