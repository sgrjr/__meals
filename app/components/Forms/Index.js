import React from 'react';

class Index extends React.Component {

  render() {

    return (
		<div>
			<div className='top-of-page'></div>
			
			{this.props.children}
			
		</div>
	);
  }
}

module.exports = Index;