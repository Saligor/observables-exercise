import Kefir from 'https://unpkg.com/kefir@3.8.3/dist/kefir.esm.js';
import { email$, password$, isFormValidResult$ } from "./ex1.js";

const submitButton = document.getElementsByClassName('pure-button-primary');

const submit$ = Kefir.fromEvents(submitButton[0], 'click')
    .map(e => {
        e.preventDefault();
        return e;
    });

const values$ = Kefir.combine({ email: email$, password: password$});

const validation$ = values$.sampledBy(submit$);

const result$ = validation$.filterBy(isFormValidResult$).take(1);

result$.observe(values => {});

result$.log();



