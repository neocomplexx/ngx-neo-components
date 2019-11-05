
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

export const compareTime = (fecha1: Date, fecha2: Date): number => {
    const hora1 = fecha1.getHours();
    const minutos1 = fecha1.getMinutes();
    const segundos1 = fecha1.getSeconds();

    const hora2 = fecha2.getHours();
    const minutos2 = fecha2.getMinutes();
    const segundos2 = fecha2.getSeconds();

    if (hora1 > hora2) {
        return 1;
    }
    if (hora2 > hora1) {
        return -1;
    }

    if (minutos1 > minutos2) {
        return 1;
    }
    if (minutos2 > minutos1) {
        return -1;
    }

    if (segundos1 > segundos2) {
        return 1;
    }
    if (segundos2 > segundos1) {
        return -1;
    }

    return 0;
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

export const stringToDate = (value: string): Date => {
    if (value.length === 10) { value += 'T03:00:00Z'; }
    const date = new Date(value);
    if (date && date.getUTCFullYear() > 1900 && date.getUTCFullYear() < 3000) {
        return date;
    }
    return null;
};

export const dateToString = (value: Date): string => {
    if (value) {
        return value.toISOString().substring(0, 10);
    } else {
        return undefined;
    }
};

export const prevMonths = (month: number): Array<Date> => {
    const fechas = new Array<Date>();
    const hastaAux = new Date();
    const hasta = new Date(hastaAux.getFullYear(), hastaAux.getMonth(), 1);
    const desde = new Date(hasta.getFullYear(), hasta.getMonth() - month, 1);
    while (desde <= hasta) {
        fechas.unshift(new Date(desde.getFullYear(), desde.getMonth(), 1));
        desde.setMonth(desde.getMonth() + 1);
    }
    return fechas;
};



export interface EnumModel {
    name: string;
    value: number;
}
