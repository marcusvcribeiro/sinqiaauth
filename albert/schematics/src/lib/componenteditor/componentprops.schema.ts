export interface Props {
    id?: string;
    creationDateUTC?: any;
    team?: string;
    project?: string;
    viewName?: string;
    baseUrlEndpoint?: string;
    endpoints?: any;
    view?: View[];
    [key: string]: any;
}

export interface View {
    type?: string;
    properties?: Properties;
    children?: Child[];
    [key: string]: any;
}

export interface Child {
    type?: string;
    properties?: Properties;
    children?: any[];
    [key: string]: any;
}

export interface Properties {
    title?: string;
    aside?: boolean;
    beComponent?: boolean;
    type?: string;
    placeholder?: string;
    endpointName?: string;
    validation?: any[];
    text?: string;
    mask?: boolean;
    align?: string;
    disabled?: boolean;
    [key: string]: any;
}




