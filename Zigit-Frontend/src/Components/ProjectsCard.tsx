import { useCallback, useEffect, useRef, useState } from "react";
import DetailsCard from "./DetailsCard";
//import "./Styles/ProjectsCard.css"
import axios from "axios";
import ProjectsTable from "./ProjectsTable";

interface ProjectsCardProps {
    token: string;
  }

const req_url = "https://private-052d6-testapi4528.apiary-mock.com/info";

function ProjectsCard(props: ProjectsCardProps) {
    const [projectsList, setProjectsList] = useState<any[]>([]);

    useEffect(() => {
        getProjectsList();
    }, []);

    const getProjectsList = useCallback(async () => {
        try {
            // In the last axios request I used .then, so now I wanted to demonstrate the usage of async/await too.
            const res = await axios.request({ headers: { Authorization: `Bearer ${props.token}` }, method: "GET", url: req_url });
            setProjectsList(res.data)
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    }, []);

    if (projectsList.length > 0) {
        projectsList.forEach(rowObj => {
            for (let [key, value] of Object.entries(rowObj)) {
              if (typeof(value) === "boolean"){
                rowObj[key] = value.toString();
              }
            }
          })
        return (
            <div className="projects-card">
                <div>
                { <ProjectsTable data={projectsList} /> }
                </div>
            </div>
        );
    }
    else return (<div style={{ fontWeight: "bold", fontSize: "2rem" }}>Loading data from the server...</div>); // Still loading.
}

export default ProjectsCard;