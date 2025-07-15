export default function BackButton({ disabled, style }) {
  function handleClick() {
    window.history.back();
  } 

  return (
    <button
      className={`gustofwind-back-button engraved`}
      style={{...style}}
      onClick={handleClick}
      disabled={disabled}
    >
      {"<- Back"}
    </button>
  );
}
