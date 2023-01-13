import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import './SearchPage.css'
import Card from './Card';   
import {FaSearchengin} from 'react-icons/fa';
import github from "../images/github-mark.png";


function SearchPage() {
  const [search, setSearch] = useState("");
  
  const [repo, setRepo] = useState([]);

  const [sortt , setSortt]= useState("stars")

 
//To fetch users 
  const fetchRepo = async () => {
    try {
      const { data } = await axios.get("https://api.github.com/search/repositories?q=" + search, {
        params: {
          sort : sortt,
          per_page: 9,
        },
      });
     
      return data?.items;
    } catch (error) {
      console.error(error);
      return null;
    }
  };







// search function
const handleSearchUsers = async (e) => {
    e.preventDefault();
    if (search) {
      const items = await fetchRepo();
      setRepo(items);
    } else {
      console.log("Your query is empty...");
      alert("Your query is empty...")
    }
  };

  // useeffect used for sorting 
  useEffect(() => {
    const displayUsersOnfilter = async () => {
      if (search) {
        const items = await fetchRepo();
        setRepo(items);
      }
    };
    displayUsersOnfilter();
  }, [sortt]);

  return (
    <div className="container">
      <div className="search">
        <div className='header'>
        <img className='imagee' src={github} alt="Git Hub"/>
        <h2>GitHub <span className='repository'>Repository</span></h2>
      
        </div>
        <form>
          <input value={search} placeholder="Search your Repo" onChange={(e)=>setSearch(e.target.value)} type="text" />
         <button onClick={handleSearchUsers}><FaSearchengin className='icon'/> </button>
        
        </form>
      </div>
      <div className="search-results">
        <div className="more-options">
          <label>
            <small>Sort :</small>
            <select onChange={(e)=>setSortt(e.target.value)}>
              <option value="forks">forks</option>
              <option value="stars">stars</option>
              <option value="help-wanted-issues">help-wanted-issues</option>
              <option value="updated">updated</option>
            </select>
          </label>
        </div>
        </div>
        <div className='gridd'>
        {repo ? (
          repo.map((repo) => {
            return <Card  repo={repo} key={repo.id} />;
          })
        ) : (
          <h2>There is nothing to display...</h2>
        )}
         </div>
      
    </div>
  );




};

export default SearchPage;