import React, { Component } from 'react';
import UserList from './UserList';
import Managers from './Managers';
import CreateUser from './CreateUser';
import Nav from './Nav';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      managers: [],
      directReportCounts: {},
    }
    this.getManagers = this.getManagers.bind(this);
    this.refreshData = this.refreshData.bind(this);
  }

  getManagers() {
    const reducedManagers = this.state.users.reduce((acc, currentUser) => {
      if (currentUser.managerId) {
      return acc.concat([(currentUser.managerId)]);
      } else {
        return acc;
      }
      }, []);
      let uniqueManagers = [...new Set(reducedManagers)];
      const managerObjs = uniqueManagers.map(managerId => {
      return this.state.users.filter(user => user.id === managerId)[0];
    });
    this.setState({ managers: managerObjs })
    const managerDirectReportCount = {};
    const managerDirectReportCounts = this.state.users.reduce((acc, currentUser) => {
      if (currentUser.managerId) {
        managerDirectReportCount[currentUser.managerId] = 0;
        return {...acc, ...managerDirectReportCount};
      } else {return acc;}
    }, {});
    this.state.users.forEach(user => {
      managerDirectReportCounts[user.managerId] += 1;
    });
    this.setState({directReportCounts: managerDirectReportCounts });
  }

  refreshData() {
  axios.get('/api/users')
  .then(users => {
    this.setState({ users: users.data });
    this.getManagers();
  })
}

  componentDidMount() {
  this.refreshData();
  }


  render() {
    const users = this.state.users;
    const refreshData = this.refreshData;
    const directReportCounts = this.state.directReportCounts;
    const userListProps = { users, refreshData, directReportCounts };
    const managers = this.state.managers;
    const managerProps = { managers, refreshData };
    const userCount = users.length;
    const managerCount = managers.length;
    const navProps = { userCount, managerCount }
    const createUserProps = { refreshData };
    return (
      <Router>
    <div>
        <Route path="/" render={(routeProps) => <Nav {...routeProps} {...navProps} />} />
        <Route exact path="/" render={(routeProps) => <UserList {...routeProps} {...userListProps} />} />
        <Route exact path="/users" render={(routeProps) => <UserList {...routeProps} {...userListProps} />} />
        <Route path="/managers" render={(routeProps) => <Managers {...routeProps} {...managerProps} />} />
        <Route path="/users/create" render={(routeProps) => <CreateUser {...routeProps} {...createUserProps} />} />
    </div>
      </Router>
    );
  }
}

export default Home;
