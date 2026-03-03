interface Props {
  total: number;
  completed: number;
}

export const CycleDots = ({ total, completed }: Props) => {
  return (
    <section className="mt-2 mx-auto w-fit flex gap-3 relative">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`w-5 h-5 rounded-full ${i < completed ? "bg-black dark:bg-white" : "bg-black/15 dark:bg-white/30"}`}
        />
      ))}
    </section>
  );
};
