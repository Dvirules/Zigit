import DetailsCard from "./DetailsCard";
import ProjectsCard from "./ProjectsCard";
import "./Styles/info.css"

function Info() {
    const tokenValues: {token: string; personalDetails: {name: string; team: string; joinedAt: string; avatar: string}} = JSON.parse(localStorage.getItem('token') ?? '');

    return (
        <div className="info-container">
            <DetailsCard tokenValues={tokenValues} />
            <ProjectsCard token={tokenValues.token} />
        </div>
    );
}

export default Info;