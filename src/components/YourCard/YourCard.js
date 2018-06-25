import React, { Component } from 'react';
import { Card } from 'antd';
const gridStyle = {
    width: '100%',
    textAlign: 'center',
  };

class UserCard extends Component {
    render(){
        console.log('user info', this.props.userCard);
        return(
            <div>
                <Card title="User Card">
                    {this.props.userCard.map((user,i) => <Card.Grid style={gridStyle} key={i}>{user.first_name} {user.last_name}</Card.Grid>)}
                </Card>
            </div>
        )
    }
}

export default UserCard;