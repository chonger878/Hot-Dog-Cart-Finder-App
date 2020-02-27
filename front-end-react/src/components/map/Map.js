import React from 'react';

//placeholder for map component
class MyMap extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    noShow()
    {
        if(this.props.show === true)
        {
            alert("show");
        }
        else{
            alert("noshow");
            alert(this.props.show);
        }
    }
    render()
    {
        return(
            <div>{this.noShow()}</div>
        )
    }

}
export default MyMap;