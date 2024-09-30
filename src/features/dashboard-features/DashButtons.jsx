import styled from "styled-components";
import { AiFillWarning } from "react-icons/ai";
import { FaComments } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Card } from '../../components/sharedStyles';

function DashButtons() {
  return (
    <DashButtonsSection>
      <Link to="/admin/comments" className="allComments">
        <h3>View All Comments</h3>
        <FaComments />
      </Link>
      <Link to="/admin/comments?filter=true" className="flaggedComments">
        <h3>Review Flagged</h3>

        <AiFillWarning />
      </Link>
    </DashButtonsSection>
  );
}

export default DashButtons;

const DashButtonsSection = styled.section`
  ${Card}
  grid-column: 2 / -1;
  grid-row: 5 / 6;
  height: 130%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0px 15px;
  z-index: 0;
  align-self: end;

  .allComments {
    border-right: 0.75px solid;
  }

  

  .allComments,
  .flaggedComments {
    display: flex;
    align-items: center;
    gap: 5px;
    flex-direction: column;
    justify-content: center;
  }

  a:hover {
  border-color: black;
  }

  svg {
    width: 35px;
    height: 35px;
  }
`;
