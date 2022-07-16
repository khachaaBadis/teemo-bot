/**
 */
 export const Teemo = (): string => {
    const messages: string[] = ['hi friend', 'hello', 'whats up', 'teeemo is here', 'tiiiiimo ', 'yes bro'];

    return messages[Math.round(Math.random() * (messages.length - 1))];
}

/**
 * Renvoit un texte de "teemo" selon la liste
 * @param size - longueur du texte
 * @param random - si la taille peut varier
 */
export const TeemoText = (size: number, random: boolean = false): string => {
    let message: string = "";

    if(random) {
        size = Math.random() * (size - 1) + 1;
    }

    for (let i = 0; i < size; i++) {
        message += Teemo();
        if(i+1<size){
            message += " ";
        }
    }

    return message;
}