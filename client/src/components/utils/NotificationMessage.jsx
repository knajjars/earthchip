import { notification } from "antd";

export default function(props) {
  notification[props.type]({
    message: props.message,
    description: props.description
  });
}
