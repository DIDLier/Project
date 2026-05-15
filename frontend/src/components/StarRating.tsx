interface StarRatingProps {
  rating: number;
}

export default function StarRating({ rating }: StarRatingProps) {
  return (
    <span>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{ color: star <= rating ? '#ffc107' : '#dee2e6', fontSize: '1.2rem' }}
        >
          ★
        </span>
      ))}
    </span>
  );
}
