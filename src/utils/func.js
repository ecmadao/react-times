// simple utils for working with sequences like Array or string

export const isSeq = seq => (typeof seq === 'string' || Array.isArray(seq));
export const head = seq => isSeq(seq) ? seq[0] : null;
export const first = head;
export const tail = seq => isSeq(seq) ? seq.slice(1) : null;
export const rest = tail;
export const last = seq => isSeq(seq) ? seq[seq.length - 1] : null;
