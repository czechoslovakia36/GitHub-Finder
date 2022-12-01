
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
        user: {},
        repos:[],
        loading:false
    }

    const [state,dispatch] = useReducer(githubReducer,initialState)

// Get initial users(testing purpose
// GET SEARCH RESULTS 

    const searchUsers= async (text) => {


        setLoading()
        
        const params = new URLSearchParams(
            {
                q:text
            }
        )
      
        
        const response= await fetch (`${GITHUB_URL}/search/users?${params}`)
        console.log("url is---> " +   `${GITHUB_URL}/search/users?${params}`)
        const {items} = await response.json()
        // console.log(data)
    
        // Commenting these out because we are using useReducer instead of useState

        // setUsers(data);
        // setLoading(false);

        dispatch({
            type:'GET_USERS',
            payload :items,
        })

    }

    // GET SINGLE USER 


    const getUser= async (login) => {


        setLoading()
        
        const url = `${GITHUB_URL}/users/${login}`
      
        const response= await fetch (`${GITHUB_URL}/users/${login}`)

        console.log("single user url is --> " + url)

        if(response.status==404){
            window.location = '/notfound'
        }
        else{


            const data = await response.json()
            // console.log(data)
        
            // Commenting these out because we are using useReducer instead of useState
    
            // setUsers(data);
            // setLoading(false);
    
            dispatch({
                type:'GET_USER',
                payload :data,
            })


        }

       

    }


    // CLEAR USER FROM STATE

    const clearUsers =()=> {
        dispatch( {type : 'CLEAR_USERS'})
    }

    // GET USERS REPOS

    const getUserRepos= async (login) => {


        setLoading()

        const params = new URLSearchParams({
            sort: 'created',
            per_page:10
        })
        
      
        
        const response= await fetch (`${GITHUB_URL}/users/${login}/repos?${params}`)
        console.log("url to repos is---> " +   `${GITHUB_URL}/users/${login}/repos`)
        const data = await response.json()
        // console.log(data)
    
        // Commenting these out because we are using useReducer instead of useState

        // setUsers(data);
        // setLoading(false);

        dispatch({
            type:'GET_REPOS',
            payload :data,
        })

    }


    // Set loading 

    const setLoading =() =>  dispatch({type:'SET_LOADING'})


    return <GithubContext.Provider value={{
        users: state.users,
        loading: state.loading,
        user:state.user,
        repos:state.repos,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos
    }}>
    {children}
    </GithubContext.Provider>
}

export default GithubContext
