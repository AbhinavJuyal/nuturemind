import toast from "react-hot-toast";

const genMultipleToasts = (values, type) => {
  values.forEach((val) => toast[type](val));
};

export default genMultipleToasts;
