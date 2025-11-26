
const Loader = () => {
  const loader = [
    {
      loader: "M",
    },
    {
      loader: "A",
    },
    {
      loader: "B",
    },
    {
      loader: "R",
    },
    {
      loader: "U",
    },
    {
      loader: "O",
    },
    {
      loader: "R",
    },
  ];
  return (
    <div className="loader">
      <div className="loader-container col-md-12 col-10">
        {loader.map((item: any) => (
          <div className="wave">{item.loader}</div>
        ))}
      </div>
    </div>
  );
};

export default Loader;
