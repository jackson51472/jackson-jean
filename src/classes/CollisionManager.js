// Gerencia colisões entre entidades do jogo
// Utiliza o método AABB (Axis-Aligned Bounding Box) para detectar sobreposição de retângulos
export class CollisionManager {
    /**
     * Verifica colisão entre dois objetos usando AABB
     * @param {object} a - Primeiro objeto (deve ter x, y, width, height)
     * @param {object} b - Segundo objeto (deve ter x, y, width, height)
     * @returns {boolean} true se houver colisão, false caso contrário
     */
    static aabb(a, b) {
        return (
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y
        );
    }
}
