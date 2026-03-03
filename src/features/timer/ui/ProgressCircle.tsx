interface Props {
  progress: number; // 0..1
}

export const ProgressCircle = ({ progress }: Props) => {
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);

  return (
    <svg
      width="280"
      height="280"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* background circle */}
      <circle
        className="text-black/15 dark:text-white/30"
        cx="100"
        cy="100"
        r={radius}
        stroke="currentColor"
        strokeWidth="18"
        fill="none"
        strokeLinecap="round"
      />

      {/* active circle */}
      <circle
        cx="100"
        cy="100"
        r={radius}
        stroke="currentColor"
        strokeWidth="18"
        fill="none"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform="rotate(-90 100 100)"
      />
    </svg>
  );
};
