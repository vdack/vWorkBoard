import { useState } from 'react';
import './Lister.css'

/**
 * a foldable list
 * @param {name, itemList, mapFuncion} props 
 * @returns - a lister
 */
export const Lister = (props) => {

    const [isFolded, setFolded] = useState(true);

    const changeList = () => {
        setFolded(!isFolded);
    }
    const showItem = (item) => {
        return (
            <li className='Lister-item' key={item.id}>
                {props.mapFunction(item)}
            </li>
        );
    }
    console.log(props.name, 'current items:', props.itemList);
    return (
        <div className='Lister-container'>
            <button className='Lister-button' onClick={changeList}>
                <span className='Lister-header'>
                    {props.name}
                </span>
                {isFolded? '+' : '-'}
            </button>

            {!isFolded && props.itemList.map(showItem)}
        </div>
    );
};