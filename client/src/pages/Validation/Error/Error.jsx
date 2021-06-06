import "./error.css";

const errorValidation = (value) => {
  return (
    <div className="error">
      <p>{value}</p>
    </div>
  );
};

export default errorValidation;
