import { useNavigate } from "react-router";

export default function GroupLink(props) {
  const navigate = useNavigate();
  const group = props.group;
  return (
    <li onClick={() => navigate(`/groups/${group.id}`)}>
      {group.name} from {group.author}
    </li>
  );
}
