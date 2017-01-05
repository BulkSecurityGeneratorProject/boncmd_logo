package ma.lnet.boncmd.service;

import ma.lnet.boncmd.domain.Commande;
import java.util.List;

/**
 * Service Interface for managing Commande.
 */
public interface CommandeService {

    /**
     * Save a commande.
     *
     * @param commande the entity to save
     * @return the persisted entity
     */
    Commande save(Commande commande);

    /**
     *  Get all the commandes.
     *  
     *  @return the list of entities
     */
    List<Commande> findAll();

    /**
     *  Get the "id" commande.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    Commande findOne(Long id);

    /**
     *  Delete the "id" commande.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
