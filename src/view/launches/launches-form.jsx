import React, { useState, useEffect } from 'react'
import logo from '../../assets/spacex-logo.png'

const LaunchesForm = (props) => {
    const [descSortState, setDescSortState] = useState(false)
    const [refreshLaunches, setRefreshLaunches] = useState(0)
    const [launches, setLaunches] = useState({})
    const convertDateFormat = (launchDate) => {
        let date = new Date(launchDate)
        date = date.toDateString()
        return `${date.split(" ")[2]}th ${date.split(" ")[1]} ${date.split(" ")[3]}`
    }

    const fetchLaunches = async () => {
        try {
            await fetch('https://api.spacexdata.com/v3/launches', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(
                    (response) => response.json(),
                    (error) => console.log("an error occured", error)
                ).then(launchesResponse => {
                    setLaunches(launchesResponse)
                    setDescSortState(false)
                })
        } catch (error) {
            throw error;
        }
    }

    useEffect(() => {
        fetchLaunches()
    }, [refreshLaunches])

    const sortBy = (launchesList) => {
        let sorted = {}
        if (!descSortState) {
            sorted = Object.values(launchesList).sort((a, b) => {
                return new Date(b.launch_date_utc) - new Date(a.launch_date_utc)
            })
        } else {
            sorted = Object.values(launchesList).sort((a, b) => {
                return new Date(a.launch_date_utc) - new Date(b.launch_date_utc)
            })
        }
        setLaunches(sorted)
        setDescSortState(prevValue => !prevValue)

    }

    return (
        <React.Fragment>
            <nav className="level">
                <div className="level-left">
                    <div className="level-item">
                        <p className="subtitle is-5">
                            <img src={logo} height="24" width="180" />
                        </p>
                    </div>
                    <div className="level-item">
                        <span className="subtitle is-5">LAUNCHES</span>
                    </div>
                </div>
                <div className="level-right">
                    <button className="button is-primary is-medium btn-refresh" onClick={() => setRefreshLaunches(Math.random())}>
                        <span>Reload data</span>
                        <span className="icon is-small img-wrapper">
                            <i className="refresh" />
                        </span>
                    </button>
                </div>
            </nav>
            <button className="button is-primary is-medium btn-sort" onClick={() => sortBy(launches)} >
                <span></span>
                <span className="icon is-small img-wrapper">
                    <i className="sort" />
                </span>
            </button>
            {
                Object.keys(launches).map((key, index) =>
                    <div className="launches-wrapper" key={key}>
                        <span># {index + 1}</span>
                        <span>{launches[key].mission_name}</span>
                        <div>
                            <span>{convertDateFormat(launches[key].launch_date_utc)}</span>
                            <span>{launches[key].rocket.rocket_name}</span>
                        </div>
                    </div>
                )
            }
        </React.Fragment>
    )
}
export default LaunchesForm