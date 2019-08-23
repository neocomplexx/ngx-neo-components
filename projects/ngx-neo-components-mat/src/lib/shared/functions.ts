
export const b64DecodeUnicode = (str): string => {
    return decodeURIComponent(Array.prototype.map.call(atob(str), (c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
};

export const getEnumArray = (e: any): string[] => {
    const objValues = Object.keys(e).map(k => e[k]);
    return objValues.filter(v => typeof v === 'string') as string[];
};

export const soloLetras = (e) => {
    if (e.keyCode >= 48 && e.keyCode <= 57) {
        return false;
    } {
        return true;
    }
};

export const soloNumeros = (e) => {
    if (e.keyCode >= 48 && e.keyCode <= 57) {
        return true;
    } {
        return false;
    }
};

export const isValidEmailAddress = (emailAddress) => {
    // tslint:disable-next-line:max-line-length
    const pattern = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return pattern.test(emailAddress);
};

export const getMonths = (): string[] => {
    return ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
};

export const equalDate = (fecha1: Date, fecha2: Date): boolean => {
    return fecha1.getDate() === fecha2.getDate() && fecha1.getMonth() === fecha2.getMonth() &&
        fecha1.getFullYear() === fecha2.getFullYear();
};

// tslint:disable:no-bitwise
export const stringHash = (value: string) => {
    let hash = 0;
    if (value.length === 0) {
        return hash;
    }
    for (let i = 0; i < value.length; i++) {
        const char = value.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
};



export interface EnumModel {
    name: string;
    value: number;
}
