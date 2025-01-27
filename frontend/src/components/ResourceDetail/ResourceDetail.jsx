import { useParams } from "react-router";
import styles from "./ResourceDetail.module.css";

export default function ResourceDetail(props) {
  const { resourceId } = useParams();

  const resourceDetails = {
    1: {
      id: 1,
      title: "Roofing Ventilation",
      content: "This is the detailed content for Resource 1.",
    },
    2: {
      id: 2,
      title: "Resource 2",
      content: "This is the detailed content for Resource 2.",
    },
    3: {
      id: 3,
      title: "Resource 3",
      content: "This is the detailed content for Resource 3.",
    },
  };

  const resource = resourceDetails[resourceId];

  if (!resource) {
    return <h2>Resource not found</h2>;
  }

  return (
    <div>
      <h1>{resource.title}</h1>
      <p>{resource.content}</p>
    </div>
  );
}
