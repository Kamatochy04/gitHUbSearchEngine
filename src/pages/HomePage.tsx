import React, { useEffect, useState } from 'react';

import {useSearchUsersQuery, useLazyGetUserRepoQuery} from "../store/github/github.api";
import { useDebounds } from '../hooks/debounds';

import RepoCard from '../components/repoCard';

const HomePage = () => {
  const [serch, setSearch] = useState('')
  const [dropdown, setDropdown] = useState(false)
  const debounced = useDebounds(serch)
  const [fetchRepos, {isLoading: reposLoading, data: repos}] = useLazyGetUserRepoQuery()
  const {isLoading, isError, data} = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3
  })

  useEffect(() => {
    setDropdown(debounced.length > 3 && data?.length! > 0);
  }, [debounced, data])

  const clickHendler = (name: string) => {
    fetchRepos(name)
    setDropdown(false)
  }
  return (
    <div className='flex justify-center pt-10 mx-auto h-screen w-screen'>
      {isError ? <h2 className='text-center text-red-600'>Something went wrong... </h2>: null}

      <div className="relative w-[560px]">
        <input type="text" className='border py-2 px-4 w-full h-[42px] mb-2' placeholder='Search for gitHub users' value={serch} onChange={(event) => setSearch(event.target.value)}/>

        <ul className="absolute top-[42px] left-0 right-0 max-h-[200px] shadow-md bg-white overflow-y-scroll">
          {isLoading ? <p className='text-center'>Loading</p> : null}
          {dropdown && data?.map(user => (
            <li key={user.id} className='py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer' onClick={() => clickHendler(user.login)}>{user.login}</li>
          ))}
        </ul>
        <div className="container">
        {reposLoading && <p className='text-center'>Repos are loading...</p>}
        {repos?.map(item => <RepoCard repo={item} key={item.id}/>)}
      </div>
      </div>
     
  </div>
  )
}

export default HomePage