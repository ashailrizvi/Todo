// This file exports reusable components or functions for the web application.

export function renderComponent(name) {
    const component = document.createElement('div');
    component.className = 'component';
    component.innerText = `This is the ${name} component.`;
    return component;
}

export function updateComponent(component, newText) {
    component.innerText = newText;
}