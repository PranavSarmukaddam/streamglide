export default function VideoCard({ info }) {
  if (!info) return null;

  return (
    <div className="video-card">
      <div className="video-card__top">
        {/* Thumbnail */}
        {info.thumbnail && (
          <div className="video-card__thumb-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={info.thumbnail}
              alt={info.title}
              className="video-card__thumb"
            />
            {info.duration && (
              <span className="video-card__duration">{info.duration}</span>
            )}
          </div>
        )}

        {/* Meta */}
        <div className="video-card__meta">
          <div className="video-card__title" title={info.title}>
            {info.title}
          </div>
          <div className="video-card__channel">{info.channel}</div>

          <div className="video-card__pills">
            {info.duration && (
              <span className="pill">{info.duration}</span>
            )}
            {info.viewCount && (
              <span className="pill">{info.viewCount} views</span>
            )}
            {info.availableHeights?.length > 0 && (
              <span className="pill">
                {Math.max(...info.availableHeights)}p Max
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
