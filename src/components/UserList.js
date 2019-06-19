import React from 'react';
import User from './User';

export default class UserList extends React.Component {
  render() {
    return (
        <div><h3>Acme User Management</h3>
      <div>
        {this.props.users.sort((a, b) => a.id - b.id).map(user => {
          return <User user={user} key={user.id} selectableManagers={this.props.users} refreshData={this.props.refreshData} directReportCounts={this.props.directReportCounts} />;
        })}
      </div>
        </div>
    );
  }
}
