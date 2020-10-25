import React, { useState, useEffect } from 'react'
import logo from '../../assets/spacex-logo.png'
import LaunchHome from '../../assets/img/launch-home@3x.png'

const Launches = () => {
    const [descSortState, setDescSortState] = useState(false)
    const [refreshLaunches, setRefreshLaunches] = useState(0)
    const [launches, setLaunches] = useState({})
    const [yearList, setYearList] = useState([])
    const [selectedYear, setSelectedYear] = useState('Filter by Year')
    const [isLoading, setIsLoading] = useState(false)
    const getDateOrdinal = (date) => {
        switch (date % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    }
    const convertDateFormat = (launchDate) => {
        let date = new Date(launchDate)
        date = date.toDateString()
        return `${date.split(" ")[2]}${getDateOrdinal(date.split(" ")[2])} ${date.split(" ")[1]} ${date.split(" ")[3]}`
    }
    const fetchLaunches = async () => {
        try {
            setIsLoading(true)
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
                    setSelectedYear('Filter by Year')
                    setYearList([...new Set(Object.values(launchesResponse).map((launch) => {
                        return launch.launch_year
                    }))])
                    setIsLoading(false)
                })
        } catch (error) {
            throw error;
        }
    }
    const sortByLaunchYear = (launchesList) => {
        let sortedLaunches = {}
        if (!descSortState) {
            sortedLaunches = Object.values(launchesList).sort((a, b) => {
                return new Date(b.launch_date_utc) - new Date(a.launch_date_utc)
            })
        } else {
            sortedLaunches = Object.values(launchesList).sort((a, b) => {
                return new Date(a.launch_date_utc) - new Date(b.launch_date_utc)
            })
        }
        setLaunches(sortedLaunches)
        setDescSortState(prevValue => !prevValue)
    }

    const filteredList = Object.values(launches).filter((launch) => {
        return launch.launch_year === selectedYear || !parseInt(selectedYear)
    })

    // fetch the launches. Trigger refresh when refreshLaunches is modified
    useEffect(() => {
        fetchLaunches()
    }, [refreshLaunches])

    const renderLoader = () => {
        return (<div className={`loader-wrapper ${isLoading ? 'is-active' : null}`} >
            <div className="loader is-loading"></div>
        </div>)
    }

    const renderHeader = () => {
        return (<nav className="level">
            <div className="level-left">
                <div className="level-item">
                    <p className="logo subtitle is-5">
                        <img alt="spacex-logo" src={logo} height="24" width="180" />
                    </p>
                </div>
                <div className="level-item">
                    <span className="launch-title subtitle is-5">LAUNCHES</span>
                </div>
            </div>
            <div className="level-right">
                <button className="button is-primary is-medium btn-refresh" onClick={() => setRefreshLaunches(Math.random())}>
                    <span>Reload data</span>
                    <span className="icon is-small img-wrapper">
                        <i className="refresh-icon" />
                    </span>
                </button>
            </div>
        </nav>)
    }

    const renderSortAndFilterButtons = () => {
        return (
            <div className="launches-action-group">
                <select className="select is-primary is-medium" value={selectedYear} onChange={(e) => {
                    setSelectedYear(e.target.value)
                }}>
                    <option default>Filter by Year</option>
                    {yearList.map((year, index) => {
                        return <option key={index} value={year}>{year}</option>
                    })}
                </select>
                <button className="button is-primary is-medium btn-sort" onClick={() => sortByLaunchYear(launches)} >
                    <span>Sort {descSortState ? "Ascending" : "Descending"} </span>
                    <span className="icon is-small img-wrapper">
                        <i className="sort-icon" />
                    </span>
                </button >
            </div>
        )
    }

    const renderLaunches = () => {
        return filteredList.map((launch, index) =>
            <div className="columns launch-details" key={index}>
                <div className="column is-2 launch-index">
                    <span># {index + 1}</span>
                </div>
                <div className="column is-7 launch-mission-name">
                    <span>{launch.mission_name}</span>
                </div>
                <div className="column is-3 has-text-right launch-year">
                    <div className="launch-date">{convertDateFormat(launch.launch_date_utc)}</div>
                    <div className="launch-rocket-name">{launch.rocket.rocket_name}</div>
                </div>
            </div>
        )
    }
    console.log('hey')
    return (
        <React.Fragment>
            {renderLoader()}
            { renderHeader()}
            {Object.keys(launches).length !== 0 &&
                <React.Fragment>
                    <div className="columns btn-controls">
                        <div className="column is-12 has-text-right">
                            {renderSortAndFilterButtons()}
                        </div>
                    </div>

                    <div className="columns">
                        <div className="column is-4">
                            <span>
                                <img alt="launch-home" src={LaunchHome} height="700" width="550" />
                            </span>
                        </div>
                        <div className="column is-8 launches-table">
                            {renderLaunches()}
                        </div>
                    </div>
                </React.Fragment>
            }

        </React.Fragment >
    )
}
export default Launches