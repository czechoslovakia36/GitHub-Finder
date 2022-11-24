import { createContext,useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext()

const GITHUB_URL=process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN=process.env.REACT_APP_GITHUB_TOKEN



export const GithubProvider = ({children}) => {

    // Commenting these out because we are using useReducer instead of useState
    // const [users,setUsers]=useState([])
    // const [loading,setLoading]= useState(true)

    const initialState= {
        users:[],
        loading:true
    }

    const [state,dispatch] = useReducer(githubReducer,initialState)



    const fetchUsers= async () => {


      
        console.log("url is---> " +   `${GITHUB_URL}/users`)
        const response= await fetch (`${GITHUB_URL}/users`

       
        )
        const data = await response.json()
        // console.log(data)
    
        // Commenting these out because we are using useReducer instead of useState

        // setUsers(data);
        // setLoading(false);

        dispatch({
            type:'GET_USERS',
            payload :data,
        })

    }
    return <GithubContext.Provider value={{
        users: state.users,
        loading: state.loading,
        fetchUsers
    }}>
    {children}
    </GithubContext.Provider>
}

export default GithubContext
