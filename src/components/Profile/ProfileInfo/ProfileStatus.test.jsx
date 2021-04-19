import React from 'react';
import ProfileStatus from "./ProfileStatus";
import {create} from "react-test-renderer";

describe("ProfileStatus Component", ()=>{
    test("status from props should be in she state",()=>{
        const component = create(<ProfileStatus status="Tesla"/>);
        const instanse = component.getInstance();
        expect(instanse.state.status).toBe("Tesla");
    })
    test("after creation <span/> span should be displayed",()=>{
        const component = create(<ProfileStatus status="Tesla"/>);
        const root = component.root;
        const span = root.findByType("span");
        expect(span).not.toBeNull();
    })
    test("after creation <input/> should be displayed",()=>{
        const component = create(<ProfileStatus status="Tesla"/>);
        const root = component.root;
        expect(()=>{
            const input = root.findByType("input");
        }).toThrow();
    })
    test("after creation <span/> contains correct status",()=>{
        const component = create(<ProfileStatus status="Tesla"/>);
        const root = component.root;
        const span = root.findByType("span");
        expect(span.children[0]).toBe("Tesla");
    })
    test("input should be displayed in editMode instead of span",()=>{
        const component = create(<ProfileStatus status="Tesla"/>);
        const root = component.root;
        const span = root.findByType("span");
        span.props.onDoubleClick();
        const input = root.findByType("input");
        expect(input.props.value).toBe("Tesla");
    })
    test("callback should be called",()=>{
        const mockCallback = jest.fn();
        const component = create(<ProfileStatus status="Tesla" updateStatus={mockCallback}/>);
        const instance = component.getInstance();
        instance.deactivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1);
    })
})