import React from 'react';
import axios from 'axios';

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedChoice: this.props.user.managerId,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.put(`/api/users/${this.props.user.id}`, { managerId: this.state.selectedChoice})
    .then(() => {
        this.props.refreshData();
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChange(event) {
    this.setState({ selectedChoice: event.target.value });
  }

  handleDelete(event) {
      event.preventDefault();
      axios.delete(`/api/users/${this.props.user.id}`)
      .then(() => {
        this.props.refreshData();
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
      const directReportCount = this.props.directReportCounts[this.props.user.id];
    return (
      <div id="user-container">
            <form id="delete-user" onSubmit={this.handleDelete}>
            <div id="user-name" />
                <button type="submit">Delete User</button>
            </form>
          <h3>{this.props.user.name}</h3><p>manages {directReportCount ? directReportCount : 0} users</p>
        <form id="save-manager" onSubmit={this.handleSubmit}>
        <label>Select a Manager:</label>
          <select onChange={this.handleChange} value={this.state.selectedChoice} >
              <option key="" value="">--none--</option>
            {this.props.selectableManagers.map(manager => this.props.user.id !== manager.id && <option key={manager.id} value={manager.id}>{manager.name}</option>)}
          </select>
          <button type="submit">{!this.state.selectedChoice && this.props.user.managerId ? 'Clear Saved Manager' : 'Save Manager'}</button>
        </form>
      </div>
    );
  }
}

