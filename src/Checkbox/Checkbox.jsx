import './Checkbox.css';

const Checkbox = ({ name, checked, id, onChange }) => {
  return (
    <input
      type="checkbox"
      name={name}
      checked={checked}
      id={id}
      onChange={onChange}
    ></input>
  );
};

export default Checkbox;
