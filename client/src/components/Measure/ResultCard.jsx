const ResultCard = ({ result, onClose }) => {
  return (
    <div className="Modal p-4">
      <h2 className="text-2xl font-bold mb-4">Calculation Result</h2>
      {/* {result && <p>{result}</p>} */}
      <div className="link link-primary"></div>
      <p dangerouslySetInnerHTML={{ __html: result }}></p>

      <button
        className="btn-primary text-white py-2 px-4 rounded-md mt-4 transition duration-300"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
};

export default ResultCard;
