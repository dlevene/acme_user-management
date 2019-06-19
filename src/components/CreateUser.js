import React from 'react';
import axios from 'axios';

export default class CreateUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          input: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
      }

      handleSubmit(event) {
        event.preventDefault();
        axios.post('/api/users/create', {name: this.state.input})
        .then(() => {
            this.props.refreshData();
          })
          .catch(error => {
            console.log(error);
          });
      }

      handleChange(event) {
        this.setState({ input: event.target.value });
      }
    render() {
        return (
            <div id="create-user-container">
                <div><h3>Create New User</h3></div>
            <form id="create-user" onSubmit={this.handleSubmit}>
            <label>Name:</label>
              <input onChange={this.handleChange} value={this.state.input} />
              <button type="submit">Save User</button>
            </form>
            </div>
        )
    }
}
