import React, {useEffect, useState} from "react";
import {Button, FormControl, TextField} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import styles from "./form-items.module.scss";
import Icon from "@material-ui/core/Icon";

// The `withStyles()` higher-order component is injecting a `classes`
// property that is used by the `Button` component.
export const StyledTextField = withStyles({
    root: {
        marginLeft: "12px",
        marginRight: "12px",
        width: 200,
    },
})(TextField);


function useFormInput(name, initialValue) {
    let [value, setValue] = useState(initialValue);
    function handleChange(e) {
        setValue(e.target.value);
    }
    return{
        name: name,
        value,
        onChange: handleChange
    };
}

function formObj(initial, name) {
    let fieldInput = useFormInput(initial);
    return {
        [name]: fieldInput
    }
}

function FControl(list) {

}

// Components
function MyInput(props) {
    return(
            <StyledTextField
                id="standard-name"
                label={props.label}
                margin="normal"
                className={props.classes}
                {...props.fieldInput}
            />
    )
}

const gera = (list) => {
    if(!list) return <></>;
    return list.map((item, key)=>{
        return(
            <MyInput label={`nome-${key}`} fieldInput={item} />
        )
    })

}

export function MyFormOld(props) {
    let arrHook = []
    for (let i = 0; i < 6; i++) {
        let fieldInput = useFormInput(i,"");
        arrHook.push(fieldInput);
    }

    function send() {
        console.log(...arrHook);
    }

    return(
        <div className={styles.main}>
            <div/>
            <div>
                <form>
                    <div className={styles.container}>
                    {gera(arrHook)}
                    </div>
                    <div className={styles.myButton}>
                        <Button
                            variant="contained"
                            color="primary"
                        onClick={()=>send()}>
                            Send <Icon>send</Icon>
                        </Button>
                    </div>
                </form>
            </div>
            <div/>
        </div>
    )
}

export function MyFormArray(props) {
    let arrHook = []
    for (let i = 0; i < 6; i++) {
        let fieldInput = useFormInput(i,"");
        arrHook.push(fieldInput);
    }

    function send() {
        console.log(...arrHook);
    }

    return(
        <div className={styles.main}>
            <div/>
            <div>
                <form>
                    <div className={styles.container}>
                    {gera(arrHook)}
                    </div>
                    <div className={styles.myButton}>
                        <Button
                            variant="contained"
                            color="primary"
                        onClick={()=>send()}>
                            Send <Icon>send</Icon>
                        </Button>
                    </div>
                </form>
            </div>
            <div/>
        </div>
    )
}

export function MyForm(props) {
    let fieldInput = useFormInput("name","");

    function send() {
        console.log("fieldInput.value",fieldInput.value);
    }

    return(
        <div className={styles.main}>
            <div/>
            <div>
                <form>
                    <div className={styles.container}>
                        <MyInput fieldInput={fieldInput} />
                    </div>
                    <div className={styles.myButton}>
                        <Button
                            variant="contained"
                            color="primary"
                        onClick={()=>send()}>
                            Send <Icon>send</Icon>
                        </Button>
                    </div>
                </form>
            </div>
            <div/>
        </div>
    )
}

export function X() {
    let [nome, setNome] = useState("");
    let [list, setList] = useState([]);
    function handleName(e) {
        setNome(e.target.value);
    }
    useEffect(()=>{
        setList(list)
        console.log("useEffect",list);
    })
    return{
        nome: {value:nome, onChange: handleName },
        list: {list, setList}
    }
}
export function TesteAPI(props) {
    let {x} = props;
    console.log(x);

    function click() {
        console.log("click");
        let val = x.nome.value;
        fetch(`https://swapi.co/api/people/${val}/`, {method: "GET"})
            .then(resp=>resp.json())
            .then(resp => {
                x.list.setList(resp.films);
            }).catch(e=>console.error(e))
    }
    return(<div>
        <input {...x.nome}/>
        <button onClick={click}>clique</button>
    </div>)
}
export function TesteAPIList(props) {
    let {x} = props;
    console.log("TesteAPIList",x.list);
    useEffect(()=>{
        x.list.setList(x.list.list)
    });
    return(
        <div>
            <ul>
                {x.list.list.map((item, key)=>{
                    return(<li key={key}>{item}</li>)
                })}
            </ul>
        </div>
    )
}

export function TesteAPIContainer(props) {
    const x = X();
return(<div>
    <TesteAPI x={x}/>
    <TesteAPIList x={x}/>
</div>)
}