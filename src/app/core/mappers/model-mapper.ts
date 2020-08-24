/**
 * The model mapper interface.
 *
 * @export
 * @interface ModelMapper
 * @template T
 */
export interface ModelMapper<T> {
  /**
   * Gets the model from a DTO.
   *
   * @param {*} dto
   * @returns {T}
   * @memberof ModelMapper
   */
  getModel(dto: any): T;

  /**
   * Gets the DTO from a model.
   *
   * @param {T} entity
   * @returns {*}
   * @memberof ModelMapper
   */
  getDto(entity: T): any;
}
