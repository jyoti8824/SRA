import React from 'react';
import { useState } from "react";
import accordianData from './AccordianData';
import "./styles.css";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";

function Accordian() {
    const [ selectedItem, setSelectedItem ] = useState( null );

    function handleSingleSelection( getDataId ) {
        setSelectedItem( selectedItem === getDataId ? null : getDataId );
    }

    return (
        <div className='accordian'>
            <h2 style={ { margin: "20px auto", color: "#1a325d" } }>Frequently Asked Questions</h2>
            <div>
                <div className='wrapper'>

                    { accordianData.map( ( data ) => (
                        <div
                            className='item'
                            key={ data.id }
                            onClick={ () => handleSingleSelection( data.id )
                            }
                        >
                            <div className='question'>
                                <h2 className='title'>{ data.title }</h2>
                                <span>{ selectedItem === data.id ? < MdOutlineKeyboardArrowUp /> : <MdKeyboardArrowDown /> }</span>
                            </div>

                            { selectedItem === data.id ? (
                                <div className='answer'>{ data.answer }</div> ) : null
                            }
                        </div>
                    ) ) }
                </div>
            </div>
        </div>
    );
}

export default Accordian;
