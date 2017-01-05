package ma.lnet.boncmd.service;

import ma.lnet.boncmd.domain.Panier;
import java.util.List;

/**
 * Service Interface for managing Panier.
 */
public interface PanierService {

    /**
     * Save a panier.
     *
     * @param panier the entity to save
     * @return the persisted entity
     */
    Panier save(Panier panier);

    /**
     *  Get all the paniers.
     *  
     *  @return the list of entities
     */
    List<Panier> findAll();

    /**
     *  Get the "id" panier.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    Panier findOne(Long id);

    /**
     *  Delete the "id" panier.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
