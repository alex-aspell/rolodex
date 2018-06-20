import React, { Component } from 'react';
import { Card } from 'antd';
const gridStyle = {
    width: '100%',
    textAlign: 'center',
  };

class UserCard extends Component {
    render(){
        return(
            <div>
                <Card title="User Card">
                    {this.props.userCard.map((user,i) => <Card.Grid style={gridStyle} key={i}>{user.firstName} {user.lastName}</Card.Grid>)}
                </Card>
            </div>
        )
    }
}

export default UserCard;