import React from 'react';
import { VideoEmbedProps } from '../../types';

const VideoEmbed = ({ url }: VideoEmbedProps) => {
  const embedUrl = url.replace('watch?v=', 'embed/');
  
  return (
    <div className="relative w-full pb-[56.25%] mb-6">
      <iframe
        className="absolute top-0 left-0 w-full h-full rounded-lg"
        src={embedUrl}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default VideoEmbed;