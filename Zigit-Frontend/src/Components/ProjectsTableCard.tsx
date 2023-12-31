import "./Styles/ProjectsTableCard.css"

interface ProjectsTableCard {
    data: any[];
}

// A card component made to dynamically present statistics on the data of its corresponding table
function ProjectsTableCard(props: ProjectsTableCard) {

    const calculateDeadLinePrecentage = (): string => {
        let deadLineOk = 0;
        props.data.forEach(dataObj => {
            if(dataObj.madeDadeline === 'true'){
                deadLineOk++;
            }
        })
        return (deadLineOk / props.data.length * 100).toFixed(2);
    }

    const calculateAverage = (): string => {
        let sum = 0;
        props.data.forEach(dataObj => {
            sum += dataObj.score;
        })
        return (sum / props.data.length).toFixed(2);
    }
    
    return (
        <div className="table-card-container">
            <div>
                <p className="data-title">Table Data Statistics</p>
                <p className="data">{`Precentage of projects finished by deadline: ${calculateDeadLinePrecentage()}%`}</p>
                <p className="data">{`Total average score: ${calculateAverage()}`}</p>
            </div>
        </div>
    );
}

export default ProjectsTableCard;