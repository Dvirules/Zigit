import "./Styles/DetailsCard.css"
interface DetailsCardProps {
    tokenValues: {token: string; personalDetails: {name: string; team: string; joinedAt: string; avatar: string}};
  }

// A function component to render and present a user's details.
function DetailsCard(props: DetailsCardProps) {
    
    return (
        <div className="details-card">
            <p className="details-header">Personal Details</p>
            <p>{`Name: ${props.tokenValues.personalDetails.name}`}</p>
            <p>{`Team: ${props.tokenValues.personalDetails.team}`}</p>
            <p>{`Joined at: ${props.tokenValues.personalDetails.joinedAt}`}</p>
            <p>Avatar:</p>
            <div className="avatar" style={{backgroundImage: `url(${props.tokenValues.personalDetails.avatar})`}} />
        </div>
    );
}

export default DetailsCard;